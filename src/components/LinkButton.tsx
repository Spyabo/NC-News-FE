import { Link } from "react-router-dom";

export default function Button({ url, name }: { url: string; name: string }) {
  return (
    <div>
      <Link to={url}>
        <button>{name}</button>
      </Link>
    </div>
  );
}
