import { useState, useEffect } from "react";
import api from "../api/axios";

const TABS = ["overview", "uploads", "users", "courses"];

export default function AdminPage() {
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [sRes, pRes, uRes, cRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/uploads/admin/pending"),
        api.get("/admin/users"),
        api.get("/admin/courses"),
      ]);
      setStats(sRes.data);
      setPending(pRes.data.uploads || pRes.data || []);
      setUsers(uRes.data);
      setCourses(cRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function moderate(id, status) {
    try {
      await api.patch(`/uploads/${id}/moderate`, { status });
      setPending((prev) => prev.filter((u) => u.id !== id));
      setStats((prev) => ({
        ...prev,
        pending_uploads: (prev?.pending_uploads || 1) - 1,
      }));
      flash(`Upload ${status}.`);
    } catch (e) {
      flash("Action failed.", true);
    }
  }

  async function toggleAdmin(userId, currentVal) {
    try {
      await api.patch(`/admin/users/${userId}`, { is_admin: !currentVal });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, is_admin: !currentVal } : u))
      );
    } catch (e) {
      flash("Failed to update user.", true);
    }
  }

  async function saveCourse() {
    try {
      await api.patch(`/admin/courses/${editCourse.id}`, {
        title: editCourse.title,
        description: editCourse.description,
        credit_units: editCourse.credit_units,
      });
      setCourses((prev) =>
        prev.map((c) => (c.id === editCourse.id ? { ...c, ...editCourse } : c))
      );
      setEditCourse(null);
      flash("Course updated.");
    } catch (e) {
      flash("Failed to update course.", true);
    }
  }

  function flash(text, err = false) {
    setMsg({ text, err });
    setTimeout(() => setMsg(null), 3000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: "Total Users", value: stats?.total_users ?? 0, icon: "👥" },
    { label: "Total Uploads", value: stats?.total_uploads ?? 0, icon: "📁" },
    { label: "Pending Review", value: stats?.pending_uploads ?? 0, icon: "⏳", warn: true },
    { label: "AI Chats", value: stats?.total_chats ?? 0, icon: "🤖" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-400">Studiwise 2.0 — FUT Minna</p>
        </div>
        {pending.length > 0 && (
          <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            {pending.length} pending
          </span>
        )}
      </div>

      {msg && (
        <div
          className={`text-sm px-4 py-2 rounded-lg ${
            msg.err ? "bg-red-900/50 text-red-300" : "bg-green-900/50 text-green-300"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <div
            key={s.label}
            className={`bg-gray-800 border rounded-xl p-4 text-center ${
              s.warn && s.value > 0 ? "border-yellow-600" : "border-gray-700"
            }`}
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-xl font-bold ${s.warn && s.value > 0 ? "text-yellow-400" : "text-white"}`}>
              {s.value}
            </div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-800 rounded-xl p-1 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 min-w-[80px] py-2 rounded-lg text-sm font-medium capitalize transition whitespace-nowrap ${
              tab === t ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {tab === "overview" && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-3">
          <h2 className="font-semibold text-white">Quick Stats</h2>
          {[
            { label: "Approved Uploads", value: stats?.approved_uploads ?? 0 },
            { label: "Rejected Uploads", value: stats?.rejected_uploads ?? 0 },
            { label: "Total Courses", value: stats?.total_courses ?? 0 },
            { label: "Total GPA Records", value: stats?.total_gpa_records ?? 0 },
          ].map((row) => (
            <div key={row.label} className="flex justify-between text-sm border-b border-gray-700 pb-2">
              <span className="text-gray-400">{row.label}</span>
              <span className="text-white font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Uploads */}
      {tab === "uploads" && (
        <div className="space-y-3">
          <h2 className="font-semibold text-white">Pending Uploads ({pending.length})</h2>
          {pending.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center text-gray-400">
              No pending uploads. All clear ✅
            </div>
          ) : (
            pending.map((upload) => (
              <div
                key={upload.id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{upload.title}</p>
                    <p className="text-xs text-gray-400">
                      {upload.course_code} · {upload.resource_type} · by {upload.uploader_name}
                    </p>
                    {upload.description && (
                      <p className="text-xs text-gray-500 mt-1">{upload.description}</p>
                    )}
                  </div>
                  <a
                    href={upload.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-violet-400 hover:text-violet-300 shrink-0"
                  >
                    View ↗
                  </a>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => moderate(upload.id, "approved")}
                    className="flex-1 bg-green-700 hover:bg-green-600 text-white text-xs py-2 rounded-lg transition"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => moderate(upload.id, "rejected")}
                    className="flex-1 bg-red-800 hover:bg-red-700 text-white text-xs py-2 rounded-lg transition"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Users */}
      {tab === "users" && (
        <div className="space-y-3">
          <h2 className="font-semibold text-white">All Users ({users.length})</h2>
          {users.map((u) => (
            <div
              key={u.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{u.name}</p>
                <p className="text-xs text-gray-400 truncate">{u.email}</p>
                <p className="text-xs text-gray-500">{u.department_name} · {u.level_name}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {u.role === 'admin' && (
                  <span className="text-xs bg-violet-800 text-violet-300 px-2 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
                <button
                  onClick={() => toggleAdmin(u.id, u.role === 'admin')}
                  className={`text-xs px-3 py-1 rounded-lg transition ${
                    u.role === 'admin'
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      : "bg-violet-800 hover:bg-violet-700 text-violet-200"
                  }`}
                >
                  {u.role === 'admin' ? "Revoke" : "Make Admin"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Courses */}
      {tab === "courses" && (
        <div className="space-y-3">
          <h2 className="font-semibold text-white">Courses ({courses.length})</h2>
          {editCourse && (
            <div className="bg-gray-800 border border-violet-600 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-violet-300">Editing: {editCourse.code}</h3>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Title</label>
                <input
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
                  value={editCourse.title}
                  onChange={(e) => setEditCourse({ ...editCourse, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Description</label>
                <textarea
                  rows={3}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
                  value={editCourse.description || ""}
                  onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Credit Units</label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  className="w-32 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
                  value={editCourse.credit_units}
                  onChange={(e) =>
                    setEditCourse({ ...editCourse, credit_units: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={saveCourse}
                  className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-lg transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditCourse(null)}
                  className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-white">
                  {c.code} — {c.title}
                </p>
                <p className="text-xs text-gray-400">
                  {c.credit_units} unit{c.credit_units !== 1 ? "s" : ""} · Sem {c.semester}
                </p>
              </div>
              <button
                onClick={() => setEditCourse(c)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-lg transition"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
