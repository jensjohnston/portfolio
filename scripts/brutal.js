const headerTags = document.querySelectorAll("h6")
const random = "abcdefghijklmnopqrstuvwxyz–./\[]*+£$ ".split("")

const runRandom = (tag) => {
    const originalContent = tag.dataset.original
  
    let newContent = ""
    let num = 0
  
    let addInterval = setInterval(() => {
      newContent = originalContent.slice(0, num)
      num = num + 1
  
      if (tag.innerHTML == originalContent) {
        clearInterval(randomInterval)
        clearInterval(addInterval)
        tag.innerHTML = originalContent
      }
    }, 100)
  
    let randomInterval = setInterval(() => {      
      tag.innerHTML = newContent
      
      for (let i = newContent.length; i < originalContent.length; i++) {
        tag.innerHTML += random[Math.floor(Math.random() * random.length)]
      }    
    }, 50)
  }
  
  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.5) {
        runRandom(entry.target)
      }
    })
  }, {
    threshold: [0.0, 0.5, 1.0]
  })
  
  headerTags.forEach(h6 => {
    h6.dataset.original = h6.innerHTML
    observer.observe(h6)
  })