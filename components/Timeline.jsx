const Timeline = ({ events }) => {
  return (
    <div className="space-y-8">
      {events.map((event, index) => (
        <div key={index} className="flex group">
          <div className="flex flex-col items-center mr-6">
            <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 transition-colors ${
              index === 0 ? 'bg-indigo-600 border-indigo-100 text-white' : 'bg-white border-gray-100 text-gray-400 group-hover:border-indigo-100 group-hover:text-indigo-600'
            }`}>
              {index === 0 ? '✓' : index}
            </div>
            {index !== events.length - 1 && (
              <div className="w-0.5 h-full bg-gray-100 group-hover:bg-indigo-50 transition-colors" />
            )}
          </div>
          <div className="pb-8 flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{event.platform}</h4>
              <span className="text-sm font-medium text-gray-400">Day {event.day}</span>
            </div>
            <p className="text-gray-600 mb-2">{event.event}</p>
            {event.timestamp && (
              <span className="text-xs text-gray-400 font-medium">
                Detected: {new Date(event.timestamp).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      ))}
      {events.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No propagation data available for this asset</p>
        </div>
      )}
    </div>
  );
};

export default Timeline;
