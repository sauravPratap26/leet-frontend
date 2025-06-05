import React, { useState } from "react";

const RoomMembersTab = ({ roomId, roomMembers, deleteMembers, selfId }) => {
  const [searchText, setSearchText] = useState("");

  const filteredMembers = roomMembers.filter((member) =>
    member.user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
      </div>

      {filteredMembers.length === 0 ? (
        <div className="flex justify-center items-center h-40 text-base-content/50">
          No members
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-base-200 p-4 rounded-lg shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {member.user.name} {selfId == member.user.id ? "<YOU>" : ""}
                </h2>
                <p className="text-sm text-base-content/70">
                  {member.user.email}
                </p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Role:</span> {member.role}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Joined:</span>{" "}
                  {new Date(member.joinedAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() =>
                  deleteMembers({ studentId: member.user.id, id: roomId })
                }
                className="btn btn-sm btn-error mt-4 self-end"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomMembersTab;
