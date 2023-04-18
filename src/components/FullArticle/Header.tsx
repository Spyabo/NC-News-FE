import dateformat from "dateformat";

export default function Header({
  title,
  topic,
  author,
  date,
}: {
  title: string;
  topic: string;
  author: string;
  date: string;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h5>{`Posted by: ${author}`}</h5>
        <h5>{dateformat(date, "longDate")}</h5>
      </div>
      <h1>{title}</h1>
      <div>
        <p>{`Topic: ${topic}`}</p>
      </div>
    </div>
  );
}
