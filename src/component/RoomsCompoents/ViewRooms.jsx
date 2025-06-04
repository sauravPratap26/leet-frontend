import { useState } from "react";
import RoomCard from "./RoomCard";

const ViewRooms = ({ userRooms, onJoinRoom, loading }) => {
  const [code, setCode] = useState("");

  const tryJoinRoom = () => {
    if (code.trim()) {
      onJoinRoom(code.trim());
      setCode("");
    }
  };

  return (
    <div className="p-6 overflow-auto">
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          className="input input-bordered w-full max-w-md"
          placeholder="Enter room code to join"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") tryJoinRoom();
          }}
        />
        <button className="btn btn-primary" onClick={tryJoinRoom}>
          Enter
        </button>
      </div>

      {loading ? (
        <p>Loading rooms...</p>
      ) : userRooms.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {userRooms.map((member) => (
            <RoomCard key={member.id} room={member.room} type={"visitor"}/>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-lg">You haven’t joined any rooms yet.</p>
          <p>Join using a code above or create your own room.</p>
        </div>
      )}
    </div>
  );
};

export default ViewRooms;
