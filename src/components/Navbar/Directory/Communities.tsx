import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal';

const Communities = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <MenuItem width='full' fontSize='10px' _hover={{ bg: 'gray.100' }} onClick={() => setOpen(true)}>
        <Flex align='center'>
          <Icon as={GrAdd} fontSize={20} mr={2} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
