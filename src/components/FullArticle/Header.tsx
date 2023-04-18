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
    <section>
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h5>{`Posted by: ${author}`}</h5>
        <h5>{dateformat(date, "longDate")}</h5>
      </header>
      <h1>{title}</h1>
      <article>
        <p>{`Topic: ${topic}`}</p>
      </article>
    </section>
  );
}
