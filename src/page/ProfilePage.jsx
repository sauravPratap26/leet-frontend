import { useEffect, useState } from "react";
import {
  Github,
  X,
  Mail,
  Code,
  BookOpen,
  User2,
  LinkedinIcon,
  Group,
  Hash,
} from "lucide-react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useAuthStore } from "../store/useAuthStore";
import { useProblemStore } from "../store/useProblemStore";

// const chartData = [
//   { name: "JavaScript", value: 35, color: "#F7DF1E" },
//   { name: "Python", value: 25, color: "#3776AB" },
//   { name: "Java", value: 20, color: "#ED8B00" },
//   { name: "C++", value: 15, color: "#00599C" },
//   { name: "Others", value: 5, color: "#6B7280" },
// ];

const avatarOptions = [
  "girl1.png",
  "girl2.png",
  "girl3.png",
  "girl4.png",
  "boy1.png",
  "boy2.png",
  "boy3.png",
  "boy4.png",
  "girl5.png",
  "girl6.png",
  "girl7.png",
  "girl8.png",
  "boy5.png",
  "boy6.png",
  "boy7.png",
  "boy8.png",
];

export default function ProfilePage() {
  const {
    authUser,
    avatar,
    updateAvatar,
    updatePassword,
    updateTags,
    userTags,
    tagsSaving,
  } = useAuthStore();

  const {
    createdProblems,
    solvedProblems,
    getSolvedProblemByUser,
    getCreatedProblemsByUser,
  } = useProblemStore();
  console.log(userTags);
  useEffect(() => {
    getSolvedProblemByUser();
    getCreatedProblemsByUser();
  }, [getCreatedProblemsByUser, getSolvedProblemByUser]);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tags, setTags] = useState([...userTags]);
  const [tagInput, setTagInput] = useState("");
  //   const [linkedinUrl, setLinkedinUrl] = useState("");
  //   const [xUrl, setXUrl] = useState("");
  //   const [githubUrl, setGithubUrl] = useState("");

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (password.length > 15) {
      errors.push("Password must be atmost 15 characters");
    }

    return errors;
  };
  const handlePasswordUpdate = () => {
    const passwordErrors = validatePassword(newPassword);

    if (passwordErrors.length > 0) {
      alert("Password validation failed:\n" + passwordErrors.join("\n"));
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!currentPassword.trim()) {
      alert("Please enter your current password");
      return;
    }

    updatePassword({ currentPassword, newPassword, confirmPassword });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleAvatarSave = () => {
    updateAvatar(selectedAvatar);
  };

  const handleTagInput = (e) => {
    if (e.key === " " && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleTagsSave = () => {
    updateTags(tags);
    console.log("Tags saved:", tags);
  };

  //   const handleSocialSave = () => {
  //     console.log("Social links saved:", { linkedinUrl, xUrl, githubUrl });
  //   };
  // const handleLogout=()=>{}

  return (
    <div className="min-h-screen bg-base-200 p-4 overflow-y-auto scroll-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header Profile Section */}
        <div className="bg-base-300 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col items-center text-center">
            {/* Profile Picture */}
            <div className="avatar mb-4">
              <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2 hover:ring-secondary transition-all duration-300">
                <img
                  src={`/assets/leetImages/${avatar}`}
                  alt="Profile"
                  className="rounded-full"
                />
              </div>
            </div>

            {/* User Info */}
            <h1 className="text-3xl font-bold text-base-content mb-2">
              {authUser.name}
            </h1>
            <p className="text-base-content/70 mb-4">{authUser.email}</p>

            {/* Role Badge */}
            <div className="badge badge-primary badge-lg mb-4">
              <Code className="w-4 h-4 mr-2" />
              {authUser.role == "ADMIN"
                ? "Problem Architect "
                : "Student Developer"}
            </div>

            {/* Stats */}
            <div className="stats shadow mb-6 h-22 overflow-y-hidden">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="stat-title">
                  Problems {authUser.role == "ADMIN" ? "Created" : "Solved"}
                </div>
                <div className="stat-value text-primary">
                  {authUser.role == "ADMIN"
                    ? createdProblems.length
                    : solvedProblems.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-base-300 rounded-2xl shadow-xl p-6">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Mail className="w-6 h-6 mr-2 text-primary" />
                Security Settings
              </h2>
              <div
                className="tooltip tooltip-left"
                data-tip="Never share your security details"
              >
                <span className="cursor-pointer text-base-content">ℹ️</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Current Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="input input-bordered input-primary w-full hover:input-secondary focus:input-secondary transition-all duration-300"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">New Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="input input-bordered input-primary w-full hover:input-secondary focus:input-secondary transition-all duration-300"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="input input-bordered input-primary w-full hover:input-secondary focus:input-secondary transition-all duration-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary w-full hover:btn-secondary transition-all duration-300 transform hover:scale-105"
                onClick={handlePasswordUpdate}
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Avatar Selection */}
          <div className="bg-base-300 rounded-2xl shadow-xl p-6">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <User2 className="w-6 h-6 mr-2 text-primary" />
                Choose Avatar
              </h2>
              <div
                className="tooltip tooltip-left"
                data-tip="Decide how you want to appear in the community"
              >
                <span className="cursor-pointer text-base-content">ℹ️</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-6 max-h-54 overflow-y-auto p-2 border border-base-content/20 rounded-lg">
              {avatarOptions.map((avatar, index) => (
                <div
                  key={index}
                  className={`avatar cursor-pointer transition-all duration-300 hover:scale-110 ${
                    selectedAvatar === avatar
                      ? "ring ring-primary ring-offset-2 ring-offset-base-100"
                      : ""
                  }`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <div className="w-16 h-16 rounded-full hover:brightness-110">
                    <img
                      src={`/assets/leetImages/${avatar}`}
                      alt={`Avatar ${index + 1}`}
                      className="rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn btn-accent w-full hover:btn-secondary transition-all duration-300 transform hover:scale-105"
              onClick={handleAvatarSave}
            >
              Save Avatar
            </button>
          </div>
        </div>

        {/* Social Links version2 work */}
        {/* <div className="bg-base-300 rounded-2xl shadow-xl p-6 mt-6">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold mb-6">
              <Group className="w-6 h-6 mr-2 text-primary" />
              Social Connections
            </h2>
            <div
              className="tooltip tooltip-left"
              data-tip="Where to find you apart from coding?"
            >
              <span className="cursor-pointer text-base-content">ℹ️</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center">
                  <LinkedinIcon className="w-5 h-5 mr-2 text-primary" />
                  LinkedIn Profile
                </span>
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                className="input input-bordered input-primary w-full hover:input-secondary focus:input-secondary transition-all duration-300"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center">
                  <X className="w-5 h-5 mr-2 text-info" />X (Twitter) Profile
                </span>
              </label>
              <input
                type="url"
                placeholder="https://x.com/your-username"
                className="input input-bordered input-primary w-full hover:input-secondary focus:input-secondary transition-all duration-300"
                value={xUrl}
                onChange={(e) => setXUrl(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center">
                  <Github className="w-5 h-5 mr-2 text-neutral" />
                  GitHub Profile
                </span>
              </label>
              <input
                type="url"
                placeholder="https://github.com/your-username"
                className="input input-bordered input-primary w-full hover:input-secondary focus:input-secondary transition-all duration-300"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary w-full hover:btn-secondary transition-all duration-300 transform hover:scale-105"
              onClick={handleSocialSave}
            >
              Save Social Links
            </button>
          </div>
        </div> */}
        {/* version 2 work */}
        {/* <div className="bg-base-300 rounded-2xl shadow-xl p-6 mt-6">
          <h2 className="text-2xl font-bold mb-6">Coding Statistics</h2>
          <div className="bg-base-200 rounded-xl p-4 transition-all duration-500 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4 text-center">Overall</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {chartData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        {/* <button
          className="btn btn-primary w-full hover:btn-secondary transition-all duration-300 transform hover:scale-105"
          onClick={handleLogout}
        >
          Logout
        </button> */}
        <div className="bg-base-300 rounded-2xl shadow-xl p-6 mt-6">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Hash className="w-6 h-6 mr-2 text-primary" />
              Skills & Interests
            </h2>
            <div
              className="tooltip tooltip-left"
              data-tip="Add tags to showcase your skills and interests"
            >
              <span className="cursor-pointer text-base-content">ℹ️</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Add Tags (Press Space to create tag)
                </span>
              </label>
              <input
                type="text"
                placeholder="Type a tag and press space..."
                className="input input-bordered input-primary w-full hover:input-secondary focus:input-secondary transition-all duration-300"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
              />
            </div>

            {/* Display Tags as Chips */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 p-4 bg-base-200 rounded-lg min-h-16">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="badge badge-primary badge-lg gap-2 hover:badge-secondary transition-all duration-300 cursor-pointer"
                    onClick={() => removeTag(index)}
                  >
                    {tag}
                    <X className="w-4 h-4 hover:text-error" />
                  </div>
                ))}
              </div>
            )}

            <button
              className="btn btn-primary w-full hover:btn-secondary transition-all duration-300 transform hover:scale-105"
              onClick={handleTagsSave}
              disabled={tagsSaving} // Optional: prevent re-click while saving
            >
              {tagsSaving ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Save Tags"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
