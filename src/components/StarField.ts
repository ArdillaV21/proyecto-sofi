class StarField {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private stars: { x: number; y: number; size: number; speed: number }[]
    private animationFrameId: number | null
  
    constructor(container: HTMLDivElement) {
      this.canvas = document.createElement("canvas")
      this.ctx = this.canvas.getContext("2d")!
      this.stars = []
      this.animationFrameId = null
  
      container.appendChild(this.canvas)
      this.resizeCanvas()
      window.addEventListener("resize", this.resizeCanvas.bind(this))
    }
  
    private resizeCanvas() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.initStars()
    }
  
    private initStars() {
      const numStars = Math.floor((this.canvas.width * this.canvas.height) / 1000)
      this.stars = []
  
      for (let i = 0; i < numStars; i++) {
        this.stars.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 2 + 0.5, // Slightly larger stars
          speed: Math.random() * 0.5 + 0.1,
        })
      }
    }
  
    private drawStars() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  
      for (const star of this.stars) {
        const gradient = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size)
        gradient.addColorStop(0, "rgba(135, 206, 235, 1)") // Sky blue center
        gradient.addColorStop(1, "rgba(135, 206, 235, 0)") // Transparent edge
  
        this.ctx.beginPath()
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        this.ctx.fillStyle = gradient
        this.ctx.fill()
  
        star.y += star.speed
        if (star.y > this.canvas.height) {
          star.y = 0
        }
      }
    }
  
    public init() {
      const animate = () => {
        this.drawStars()
        this.animationFrameId = requestAnimationFrame(animate)
      }
      animate()
    }
  
    public destroy() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId)
      }
      window.removeEventListener("resize", this.resizeCanvas)
      this.canvas.remove()
    }
  }
  
  export default StarField
  
  