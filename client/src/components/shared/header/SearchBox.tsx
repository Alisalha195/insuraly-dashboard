import { Box, InputGroup, Input, Flex, } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu';
import useThemedColors from '../../../hooks/useThemedColors';

const SearchBox = ({setSearchValue, ref, isFull, large}) => {
   const { textPrimary} = useThemedColors();
  return (
    <Box borderWidth={1} borderStyle={'solid'} borderColor={textPrimary} paddingY={large ? "10px" :'2px'} paddingX='4px' borderRadius={9} width={isFull && '100%'} >
      <InputGroup width={'100%'}>
         <Flex width={'100%'}  className='btn text-[20px]' justifyContent={'center'} paddingY={0}>
            <Flex flexDirection={'column'} justifyContent={'center'} paddingY={0} paddingLeft={1}>
               <LuSearch className='text-[26px]'/> 
            </Flex>
            <Input ref={ref && ref} className='text-[20px]' marginY={0} paddingY='4px' placeholder="Search..." size='xs' border={'none'} outline={'none'} height={'auto'} lineHeight={1} width={"100%"}
            onChange={(e)=>setSearchValue(e.target.value)}
            />
         </Flex>
      </InputGroup>
    </Box>
  )
}

export default SearchBox;