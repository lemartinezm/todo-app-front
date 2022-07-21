import { chakra } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

export const MotionFlex = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children' || prop === 'onClick',
  baseStyle: {
    display: 'flex'
  }
});
