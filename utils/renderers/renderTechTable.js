export function renderTechTable(object) {
  return (
    <table className="table-auto w-full border rounded-md">
      {object.map((row) => {
        return (
          <tr className={`${row.type === "header" ? "bg-neutral-4" : ""}`}>
            {row?.cells.map((cell) => {
              return <td className={`${row.type === "header" ? "font-bold font-heading py-0.25 text-base" : "font-mono text-base py-0.5"} px-1 border-b`}>{cell}</td>;
            })}
          </tr>
        );
      })}
    </table>
  );
}
