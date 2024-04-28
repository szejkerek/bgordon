import { FunctionComponent } from "react";
import { IAboutServices } from "../resources/about";

export const AboutCard: FunctionComponent<{ service: IAboutServices }> = ({
  service: { Icon, About, Title },
}) => {
  return (
    <div>
      <Icon />
      <h4>{Title}</h4>
      <p>{About}</p>
    </div>
  );
};
