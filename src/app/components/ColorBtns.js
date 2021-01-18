import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const RedIconBtn = withStyles({
  root: {
      color: '#ec2a2a',
      backgroundColor: 'unset',
      '&:hover': {
        backgroundColor: '#ff55552e',
      },
  },
})(IconButton);
