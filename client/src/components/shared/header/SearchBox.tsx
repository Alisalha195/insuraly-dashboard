import { Box, InputGroup, Input, Flex, Text, } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu';
import useThemedColors from '../../../hooks/useThemedColors';

const SearchBox = ({setSearchValue, ref, isFull, large}) => {
   const { textPrimary, searchBoxBorder, textSecondary} = useThemedColors();
  return (
    <Box 
       borderWidth={1} 
       borderStyle={'solid'} 
       borderColor={searchBoxBorder} 
       paddingY={large ? "10px" :'2px'} 
       paddingX='4px' 
       borderRadius={9} 
       width={isFull && '100%'} 
    >
      <InputGroup width={'100%'}>
         <Flex 
            width={'100%'}  
            className=' text-[20px]' 
            justifyContent={'center'} 
            paddingY={0}
         >
            <Flex 
               flexDirection={'column'} 
               justifyContent={'center'} 
               paddingY={0} 
               paddingLeft={1}
            >
               <Text color={textSecondary} >
                  <LuSearch  className='text-[26px]'/>
               </Text> 
            </Flex>
            <Input 
               ref={ref && ref} 
               className='text-[20px]' 
               marginY={0} 
               paddingY='4px' 
               placeholder="Search..." 
               size='xs' 
               border={'none'} 
               outline={'none'} 
               height={'auto'} 
               lineHeight={1} 
               width={"100%"}
               onChange={(e)=>setSearchValue(e.target.value)}
               color={textPrimary}
            />
         </Flex>
      </InputGroup>
    </Box>
  )
}

export default SearchBox;