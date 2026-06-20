import "./EmptyState.css";

function EmptyState({
  title="No Data Found",
  description="Nothing to display."
}) {
  return (
    <div className="empty-state">

      <h2>{title}</h2>

      <p>{description}</p>

    </div>
  );
}

export default EmptyState;