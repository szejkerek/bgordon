import { FunctionComponent } from "react";
import { IAboutServices } from "../types";

export const AboutCard: FunctionComponent<{ service: IAboutServices }> = ({
  service: { Icon, About, Title },
}) => {
  const createMarkup = () => {
    return {
      __html: About,
    };
  };

  return (
    <div className="flex items-center p-2 space-x-4">
      <Icon className="text-green-400 w-9 h-9" />
      <div>
        <h4 className="font-bold">{Title}</h4>
        <p dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div>
  );
};
