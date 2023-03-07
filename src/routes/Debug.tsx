import { DebugTable } from "../components/DebugTable";
import Deck from "../models/deck";

const Debug = ({ deck }: { deck: Deck }) => {
  return <DebugTable deck={deck} />;
};

export default Debug;
