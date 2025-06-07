import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { useRoomsStore } from "../../store/useRoomStore";
import { useAuthStore } from "../../store/useAuthStore";

const AdminRoomMembers = () => {
  const { id } = useParams();
  const {
    getMembersForAdmin,
    roomMembers,
    loadingRooms,
    changeMembersPermission,
  } = useRoomsStore();

  const [searchText, setSearchText] = useState("");
  const { authUser } = useAuthStore();
  useEffect(() => {
    getMembersForAdmin(id);
  }, [getMembersForAdmin, id]);

  const filteredMembers = roomMembers.filter((member) =>
    member.user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const changeRole = (userId, newRole) => {
    changeMembersPermission({ id, userId, newPermission: newRole });
  };

  const toggleBan = (userId, currentStatus) => {
    changeMembersPermission({ id, userId, isBanned: !currentStatus });
  };

  const deleteMember = (userId) => {
    changeMembersPermission({ id, userId, deleteMember: true });
  };

  if (loadingRooms) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {filteredMembers.length === 0 ? (
        <div className="text-center text-base-content/50 py-20">
          No members found
        </div>
      ) : (
        <div className="flex-col">
          <p className="my-10 text-red-600 font-bold text-2xl">
            Changes you do are immediately reflected, please be mindful!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-base-200 p-4 rounded-xl shadow-md flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-bold">{member.user.name}</h2>
                  <p className="text-sm text-base-content/70 mb-2">
                    {member.user.email} {" "} {authUser.email===member.user.email?"<YOU>":""}
                  </p>

                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Role:</span>{" "}
                      <select
                        className="select select-bordered select-xs ml-2"
                        value={member.role}
                        onChange={(e) =>
                          changeRole(member.user.id, e.target.value)
                        }
                      >
                        <option value="STUDENT">STUDENT</option>
                        <option value="TEACHER">TEACHER</option>
                      </select>
                    </p>
                    <p>
                      <span className="font-medium">Joined:</span>{" "}
                      {new Date(member.joinedAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Banned:</span>{" "}
                      <span
                        className={
                          member.banned ? "text-red-500" : "text-green-500"
                        }
                      >
                        {member.banned ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 justify-end">
                  <button
                    onClick={() => toggleBan(member.user.id, member.banned)}
                    className={`btn btn-xs ${
                      member.banned ? "btn-success" : "btn-warning"
                    }`}
                  >
                    {member.banned ? "Unban" : "Ban"}
                  </button>
                  <button
                    onClick={() => deleteMember(member.user.id)}
                    className="btn btn-xs btn-error"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoomMembers;
