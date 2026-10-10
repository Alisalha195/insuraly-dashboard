import { Box, Flex } from '@chakra-ui/react'
import CardContent from './CardContent'
import CardBadge from './CardBadge'
import BadgeItem from './BadgeItem'
import CardHeader from './CardHeader'
import CardRow from './CardRow'

const Card = ({children, styles , ...props}:{children:any, styles?:any}) => {
  return (
      <Box>
         <Flex 
             style={{...styles}}
             {...props}
         >
            {children}
         </Flex>
      </Box>
  )
}
Card.CardHeader = CardHeader
Card.CardContent = CardContent
Card.CardBadge = CardBadge;
Card.BadgeItem = BadgeItem;
Card.CardRow = CardRow;

export default Card;