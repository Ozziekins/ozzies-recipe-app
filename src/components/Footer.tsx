import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'black',
        p: 2,
        textAlign: 'center',
        mt: 4,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Recipe App. All rights reserved.
      </Typography>
      <Typography variant="caption">
        Built with React, Material-UI, and React Query.
      </Typography>
    </Box>
  );
};

export default Footer;
