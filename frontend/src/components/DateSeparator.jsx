const DateSeparator = ({ date }) => {
	return (
		<div className="sticky top-0 z-10 flex justify-center my-0">
			<span className="text-xs px-3 py-1 rounded-md shadow-md">
				{date}
			</span>
		</div>
	);
};

export default DateSeparator;
