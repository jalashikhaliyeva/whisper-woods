import Container from "@/components/layout/Container";
import { CollectionItems } from "./CollectionItems";
import { Heading } from "./Heading";

export const Collection: React.FC = () => {
  return (
    <Container>
      <Heading />
      <CollectionItems />
    </Container>
  );
};
