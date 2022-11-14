const commentList = $("#commentList")

const search = new URLSearchParams(document.location.search)
const page = search.get("page") || 1

axios.get("/comment?page=" + page).then(res => {
  const comments = res.data
  for (const c of comments) {
    const div1 = $("<div></div>")
    const img = $("<img>")
    div1.addClass("commenterImage")
    const n = Math.floor(Math.random() * 60 + 10)
    img.attr("src", `http://placekitten.com/${n}/${n}`)
    div1.append(img)

    const div2 = $("<div></div>")
    const p = $("<p></p>")
    const span = $("<span></span>")
    div2.addClass("commentText")
    span.addClass("date sub-text")
    div2.append(p)
    div2.append(span)
    p.html(c.content)
    span.text(c.created_time)

    const li = $("<li></li>")
    li.append(div1)
    li.append(div2)
    commentList.append(li)
  }

})

const submit = $("#submit")
const input = $("#input")
submit.on("click", e => {
  e.preventDefault()
  const content = input.val()
  axios.post("/comment", {
    page,
    content
  }).then(() => {
    alert("success")
  })
})