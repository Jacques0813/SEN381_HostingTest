import ServiceD from "./ServiceD";
import ClientD from "./ClientD";
import ContractD from "./ContractD";

interface Props {
  id: number;
  type: string;
}

function Admin({ id, type }: Props) {
  return type == "Service Department" ? (
    <ServiceD id={id} />
  ) : type == "Client Department" ? (
    <ClientD id={id} />
  ) : type == "Contract Department" ? (
    <ContractD id={id} />
  ) : null;
}

export default Admin;
