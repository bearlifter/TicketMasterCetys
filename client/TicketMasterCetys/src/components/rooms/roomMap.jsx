export default function RoomMap({ rooms, onRoomSelect }) {
    return (
      <div className="relative w-full h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full"
        >
          {/* Fondo del mapa */}
          <rect x="0" y="0" width="1000" height="600" fill="#f3f4f6" />
          
          {/* Pasillos */}
          <path 
            d="M100 100 H900 V500 H100 Z" 
            fill="#e5e7eb" 
            stroke="#d1d5db" 
            strokeWidth="2"
          />
  
          {/* Renderizar salones */}
          {rooms?.map((room) => (
            <g 
              key={room._id}
              onClick={() => onRoomSelect(room)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <rect
                x={room.coordinates.x}
                y={room.coordinates.y}
                width={room.coordinates.width}
                height={room.coordinates.height}
                fill="#60a5fa"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text
                x={room.coordinates.x + room.coordinates.width/2}
                y={room.coordinates.y + room.coordinates.height/2}
                textAnchor="middle"
                dy=".3em"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {room.roomNumber}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }