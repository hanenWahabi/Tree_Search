import React from "react";
import { RadioButtonUnchecked, RadioButtonChecked } from "@material-ui/icons";
import { FormControlLabel, Radio, Typography } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";

const styles = createStyles({
  formControlLabel: { fontSize: "11px", "& label": { fontSize: "11px" } }
});

export default class Subsection extends React.Component {
  render() {
    const { name, onChecked } = this.props;
    return (
      <div>
        <FormControlLabel
          value={name}
          label={
            <Typography style={styles.formControlLabel} onClick={onChecked}>
              {name}
            </Typography>
          }
          control={
            <Radio
              onChange={onChecked}
              icon={<RadioButtonUnchecked style={{ fontSize: 15 }} />}
              checkedIcon={<RadioButtonChecked style={{ fontSize: 15 }} />}
            />
          }
        />
      </div>
    );
  }
}
