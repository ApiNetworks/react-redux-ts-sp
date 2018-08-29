import * as React from "react";
import pnp from "sp-pnp-js/lib/pnp";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { initializeIcons } from "@uifabric/icons";
import "@progress/kendo-ui";
import "@progress/kendo-theme-default/dist/all.css";
import { pnpConfig } from "../config/pnp.config";

import { getCurrentUser } from "../api/UserAPI";
import { IAppProps } from "../models/IAppProps";
import { ICurrentUserState } from "../models/IUserState";
import { FormRow } from "./Form/FormRow";
import { TextField } from "office-ui-fabric-react/lib/TextField";

export class App extends React.Component<IAppProps, {}> {
  constructor(props: IAppProps) {
    super(props);
    pnp.setup(pnpConfig);
    getCurrentUser(props);
  }

  componentWillMount() {
    initializeIcons(undefined, { disableWarnings: true });
  }

  public render(): JSX.Element {
    const userState: ICurrentUserState = this.props.store.user.currentUser;
    return (
      <Fabric>
        {this.props.store.user.error ? (
          <div>
            Error while fetching current user from SharePoint.
            {this.props.store.user.error}
          </div>
        ) : (
          this.props.store.user.currentUser.isFetched && (
            <div>
<FormRow
              label={projectCol.GeneralComment.Label}
              required={projectCol.GeneralComment.IsRequired}
            >
             <TextField
                  multiline
                  resizable={true}
                  value={localProjectData.generalComment}
                  onChanged={value => {
                    localProjectData.generalComment = value;
                    this.props.updateProjectData(localProjectData);
                  }}
                  disabled={isClosed}
                />

            </div>
          )
        )}
      </Fabric>
    );
  }
}