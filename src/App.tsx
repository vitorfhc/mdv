import { useState, useEffect } from "react"
import {
  Heart,
  Flower2,
  HandHeart,
  Coffee,
  Cookie,
  Sun,
  Copy,
  Check,
} from "lucide-react"

function App() {
  const [inputMessage, setInputMessage] = useState("")
  const [outputMessage, setOutputMessage] = useState("")
  const [displayMessage, setDisplayMessage] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const updateDisplayMessage = async () => {
      if (outputMessage !== displayMessage) {
        setIsTransitioning(true)
        await new Promise((resolve) => setTimeout(resolve, 300)) // Wait for fade out
        setDisplayMessage(outputMessage)
        setIsTransitioning(false)
      }
    }

    updateDisplayMessage()
  }, [outputMessage, displayMessage])

  const transformMessage = (message: string) => {
    if (!message.trim()) return

    const endearments = [
      "meu netinho(a) amado(a)",
      "meu amor",
      "anjinho(a) da vovó",
      "tesouro",
    ]
    const blessings = [
      "Deus te abençoe sempre!! 🙏✨",
      "Que Nossa Senhora te proteja!! 🙏👼",
      "Fique com Deus!! 🙏💫",
    ]
    const concerns = [
      "Já comeu hoje?? 🍲",
      "Tá se alimentando direito?? 😊",
      "Não esquece de tomar água!! 💧",
    ]
    const emojis = ["❤️", "🌺", "🙏", "✨", "💖", "👵", "😘"]

    let transformed = `${endearments[Math.floor(Math.random() * endearments.length)]}, `
    transformed += message
      .replace(/o/g, "oo")
      .replace(/!+/g, "!!!!")
      .replace(/\?+/g, "????")
      .toUpperCase()
    transformed +=
      "\n\n" + concerns[Math.floor(Math.random() * concerns.length)]
    transformed +=
      "\n\n" + blessings[Math.floor(Math.random() * blessings.length)]
    transformed +=
      "\n\n" +
      Array(3)
        .fill(null)
        .map(() => emojis[Math.floor(Math.random() * emojis.length)])
        .join(" ")

    setOutputMessage(transformed)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF5F5] relative overflow-hidden pb-32">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-pink-200 opacity-20">
          <Flower2 size={80} />
        </div>
        <div className="absolute bottom-10 right-10 text-pink-200 opacity-20">
          <Heart size={80} />
        </div>
        <div className="absolute top-1/2 right-20 text-pink-200 opacity-20">
          <HandHeart size={60} />
        </div>
        <div className="absolute bottom-20 left-20 text-pink-200 opacity-20">
          <Coffee size={60} />
        </div>
        <div className="absolute top-20 right-40 text-pink-200 opacity-20">
          <Cookie size={60} />
        </div>
        <div className="absolute top-40 left-40 text-pink-200 opacity-20">
          <Sun size={60} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-pink-600 mb-4 font-serif">
              Mensagem de Vó
            </h1>
            <p className="text-gray-600 text-lg">
              Transforme sua mensagem no jeito carinhoso que só a vovó sabe
              escrever!
            </p>
          </div>

          {/* Output Section */}
          {displayMessage && (
            <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-pink-100 mb-8 animate-message-appear">
              <div className="bg-pink-50 p-6 rounded-lg relative">
                <div className="absolute -top-3 -left-3">
                  <Heart className="text-pink-400" size={24} />
                </div>
                <button
                  onClick={copyToClipboard}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
                    copied
                      ? "bg-green-100 text-green-600"
                      : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                  }`}
                  title="Copiar mensagem"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
                <p
                  className={`text-gray-700 text-lg whitespace-pre-wrap pr-10 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
                >
                  {displayMessage}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Input Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-pink-100 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <textarea
              className="flex-1 p-4 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-400 text-gray-700 text-lg resize-none"
              placeholder="Digite sua mensagem aqui, meu netinho..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              rows={2}
            />
            <button
              onClick={() => transformMessage(inputMessage)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Heart size={20} />
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
