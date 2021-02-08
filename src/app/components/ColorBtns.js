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

export const GreyIconBtn = withStyles({
  root: {
      color: '#b1b1b1',
      backgroundColor: 'unset',
      '&:hover': {
        backgroundColor: '#b3b3b32e',
      },
  },
})(IconButton);
