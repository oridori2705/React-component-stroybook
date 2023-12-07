import styled from '@emotion/styled'
import EmojiListItem from '../EmojiListItem'
import PropTypes from 'prop-types'
const Container = styled.ul`
  width: 100%;
  padding: 0;
`

const EmojiList = ({ emojis, keyword }) => {
  if (!keyword) return

  return (
    <Container>
      {emojis
        .filter(
          emoji =>
            emoji.aliases
              .map(al => al.indexOf(keyword) >= 0)
              .some(has => has) ||
            emoji.tags.map(al => al.indexOf(keyword) >= 0).some(has => has)
        )
        .slice(0, 10)
        .map((emoji, i) => (
          <EmojiListItem
            key={i}
            emoji={emoji}></EmojiListItem>
        ))}
    </Container>
  )
}
EmojiList.propTypes = {
  keyword: PropTypes.string,
  emojis: PropTypes.arrayOf(
    PropTypes.shape({
      emoji: PropTypes.string,
      description: PropTypes.string,
      category: PropTypes.string,
      aliases: PropTypes.arrayOf(PropTypes.string).isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      unicode_version: PropTypes.string,
      ios_version: PropTypes.string
    })
  ).isRequired
}
export default EmojiList
