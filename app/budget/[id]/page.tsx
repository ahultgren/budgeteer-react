import Ledger from "./components/ledger";

export default async function Budget(props) {
  const params = await props.params;
  const id = params.id;

  return <Ledger id={id} />;
}
