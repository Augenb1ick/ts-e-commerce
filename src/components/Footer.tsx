
function Footer() {

  const year: number = new Date().getFullYear();

  const content = (
    <footer className="footer">
      <p className="">Интернетный магазин &copy; {year}</p>
    </footer>
  )

  return content
}

export default Footer