export const Filter = ({ newFilter, setNewFilter }) => {
  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };
  return (
    <form>
      <div>
        filter shown with: <input value={newFilter} onChange={handleFilter} />
      </div>
    </form>
  );
};
