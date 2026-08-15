import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [tab, setTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const [form, setForm] = useState({ name: "", email: "" });
  const [pwForm, setPwForm] = useState({ current_password: "", new_password: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const [statsRes, bookRes] = await Promise.all([
        api.get("/profile/stats"),
        api.get("/profile/bookmarks"),
      ]);
      setStats(statsRes.data);
      setBookmarks(bookRes.data);
      setForm({ name: user?.name || "", email: user?.email || "" });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await api.patch("/profile", { name: form.name });
      setUser((prev) => ({ ...prev, name: res.data.name }));
      setMsg({ type: "ok", text: "Profile updated." });
    } catch (e) {
      setMsg({ type: "err", text: e.response?.data?.error || "Failed to update." });
    } finally {
      setSaving(false);
    }
  }

  async function changePassword() {
    setPwMsg(null);
    if (pwForm.new_password !== pwForm.confirm) {
      setPwMsg({ type: "err", text: "Passwords do not match." });
      return;
    }
    try {
      await api.post("/auth/change-password", {
        current_password: pwForm.current_password,
        new_password: pwForm.new_password,
      });
      setPwMsg({ type: "ok", text: "Password changed successfully." });
      setPwForm({ current_password: "", new_password: "", confirm: "" });
    } catch (e) {
      setPwMsg({ type: "err", text: e.response?.data?.error || "Failed to change password." });
    }
  }

  async function removeBookmark(courseId) {
    try {
      await api.delete(`/profile/bookmarks/${courseId}`);
      setBookmarks((prev) => prev.filter((b) => b.course_id !== courseId));
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: "AI Chats", value: stats?.total_chats ?? 0, icon: "🤖" },
    { label: "Uploads", value: stats?.total_uploads ?? 0, icon: "📤" },
    { label: "GPA Records", value: stats?.total_gpa_records ?? 0, icon: "📊" },
    { label: "Day Streak", value: `${stats?.streak ?? 0}d`, icon: "🔥" },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-2xl font-bold text-white">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">{user?.name}</h1>
          <p className="text-sm text-gray-400">{user?.email}</p>
          {user?.is_admin && (
            <span className="text-xs bg-violet-700 text-violet-200 px-2 py-0.5 rounded-full mt-1 inline-block">
              Admin
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-lg font-bold text-white">{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-800 rounded-xl p-1">
        {["profile", "security", "bookmarks"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition ${
              tab === t ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab: Profile */}
      {tab === "profile" && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-white">Edit Profile</h2>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Full Name</label>
            <input
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Email (read-only)</label>
            <input
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-500 text-sm cursor-not-allowed"
              value={form.email}
              readOnly
            />
          </div>
          {msg && (
            <p className={`text-sm ${msg.type === "ok" ? "text-green-400" : "text-red-400"}`}>
              {msg.text}
            </p>
          )}
          <button
            onClick={saveProfile}
            disabled={saving}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white py-2 rounded-lg text-sm font-medium transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          {/* Academic Info */}
          <div className="pt-4 border-t border-gray-700 space-y-2">
            <h3 className="text-sm font-semibold text-gray-300">Academic Info</h3>
            {[
              { label: "University", value: stats?.university_name },
              { label: "Faculty", value: stats?.faculty_name },
              { label: "Department", value: stats?.department_name },
              { label: "Level", value: stats?.level_name },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-sm">
                <span className="text-gray-500">{row.label}</span>
                <span className="text-gray-200">{row.value || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Security */}
      {tab === "security" && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-white">Change Password</h2>
          {["current_password", "new_password", "confirm"].map((field) => (
            <div key={field}>
              <label className="text-xs text-gray-400 mb-1 block capitalize">
                {field.replace(/_/g, " ")}
              </label>
              <input
                type="password"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
                value={pwForm[field]}
                onChange={(e) => setPwForm({ ...pwForm, [field]: e.target.value })}
              />
            </div>
          ))}
          {pwMsg && (
            <p className={`text-sm ${pwMsg.type === "ok" ? "text-green-400" : "text-red-400"}`}>
              {pwMsg.text}
            </p>
          )}
          <button
            onClick={changePassword}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2 rounded-lg text-sm font-medium transition"
          >
            Update Password
          </button>
        </div>
      )}

      {/* Tab: Bookmarks */}
      {tab === "bookmarks" && (
        <div className="space-y-3">
          {bookmarks.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center text-gray-400">
              No bookmarks yet. Bookmark courses from the Courses page.
            </div>
          ) : (
            bookmarks.map((b) => (
              <div
                key={b.course_id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-white">{b.course_code}</p>
                  <p className="text-xs text-gray-400">{b.course_title}</p>
                </div>
                <button
                  onClick={() => removeBookmark(b.course_id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
