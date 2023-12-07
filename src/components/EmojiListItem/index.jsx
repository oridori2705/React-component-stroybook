import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ListItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid black;
  cursor: pointer;
`

const Symbol = styled.div`
  font-size: 24px;
  margin-right: 16px;
`

const Title = styled.div`
  width: 200px;
`
const Keyword = styled.div`
  flex: 1;
`

const EmojiListItem = ({ emoji }) => {
  return (
    <ListItem>
      <Symbol>{emoji.emoji}</Symbol>
      <Title>{emoji.aliases.map(title => title)}</Title>
      <Keyword>{emoji.description}</Keyword>
    </ListItem>
  )
}

EmojiListItem.propTypes = {
  emoji: PropTypes.shape({
    emoji: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    aliases: PropTypes.arrayOf(PropTypes.string).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    unicode_version: PropTypes.string,
    ios_version: PropTypes.string
  })
}

export default EmojiListItem
