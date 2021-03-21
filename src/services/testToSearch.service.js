class TextToSearch {
  findAllInserts (textToSearch, subTexts) {
    const result = []
    for (let i = 0; i < subTexts.length; i++) {
      const pos = this.getSubTextPosition(textToSearch, subTexts[i])
      result.push({
        subtext: subTexts[i],
        result: pos
      })
    }
    return result
  }

  getSubTextPosition (textToSearch, word) {
    const positions = []
    for (let s = 0; s < textToSearch.length; s++) {
      let w = 0
      for (w; w < word.length; w++) {
        if (word[w].localeCompare(textToSearch[s + w], undefined, { sensitivity: 'accent' }) !== 0) break
      }
      if (w === word.length) positions.push(s + 1)
    }
    if (positions.length === 0) {
      return '<No Output>'
    }
    return positions.join(',')
  }

  getTextToSearch (textToSearch, subTexts) {
    return new Promise((resolve, reject) => {
      if (textToSearch && subTexts) {
        const result = this.findAllInserts(textToSearch.text, subTexts.subTexts)
        const output = {
          candidate: process.env.auther,
          text: textToSearch.text,
          results: result
        }
        return resolve(output)
      } else {
        return reject(new Error('Input failed.'))
      }
    })
  }
}
export default new TextToSearch()
