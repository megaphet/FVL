import { useMemo, useState } from 'react'
import './App.css'

const WHATSAPP_NUMBER = '250791234567'

const products = [
  {
    id: 'veggie-box',
    name: 'Fresh Veggie Box',
    size: 'Small · 3 kg',
    description: 'Tomatoes, carrots, onions, greens and green pepper.',
    price: 5000,
    cost: 'from 5,000 RWF',
    tone: 'green',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'fruit-box',
    name: 'Fresh Fruit Box',
    size: 'Small · 3 kg',
    description: 'Bananas, avocados, pineapple, passion fruit and oranges.',
    price: 6000,
    cost: 'from 6,000 RWF',
    tone: 'orange',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'bulk-crate',
    name: 'Bulk Supply Crate',
    size: '20 kg · B2B',
    description: 'Mixed fresh produce for shops, restaurants and canteens.',
    price: 24000,
    cost: 'from 24,000 RWF',
    tone: 'deep',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'subscription',
    name: 'Weekly Subscription Box',
    size: 'Every week · 1 box',
    description: 'A rotating fruit and vegetable box, delivered on schedule.',
    price: 10000,
    cost: 'from 10,000 RWF',
    tone: 'lime',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85',
  },
]

const formatPrice = (price) => `${price.toLocaleString('en-US')} RWF`

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All produce')

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const displayedProducts = activeCategory === 'All produce'
    ? products
    : products.filter((product) => activeCategory === 'Subscriptions' ? product.id === 'subscription' : product.id === 'bulk-crate')

  const cartLabel = useMemo(() => cartCount === 0 ? 'Your basket is empty' : `${cartCount} ${cartCount === 1 ? 'item' : 'items'}`, [cartCount])

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id)
      if (found) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function updateQuantity(id, change) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0))
  }

  function checkoutOnWhatsApp() {
    const orderLines = cart.map((item) => `- ${item.name} x${item.quantity}: ${formatPrice(item.price * item.quantity)}`).join('\n')
    const message = `Hello FruitVeggieLink! I would like to place this order:\n\n${orderLines}\n\nTotal: ${formatPrice(cartTotal)}\nDelivery area: Huye\nPlease confirm availability and delivery details.`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main>
      <div className="announcement">Fresh stock is packed daily in Huye <span>•</span> Free campus delivery over 10,000 RWF</div>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="FruitVeggieLink home"><img src="/fvl-logo.svg" alt="FruitVeggieLink" /></a>
        <div className="nav-links"><a href="#shop">Shop</a><a href="#how-it-works">How it works</a><a href="#about">About FVL</a></div>
        <button className="basket-button" onClick={() => setCartOpen(true)} aria-label="Open basket">Basket <span>{cartCount}</span></button>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy"><p className="eyebrow">Huye's fresh food connection</p><h1>Good food should<br /><em>find you.</em></h1><p className="hero-text">Fresh fruit and vegetables, thoughtfully gathered from local farmers and delivered to your door, office, or shop.</p><a className="primary-button" href="#shop">Shop fresh produce <span>↘</span></a><div className="hero-meta"><div><strong>2–4 hrs</strong><span>same-day delivery</span></div><div><strong>100%</strong><span>hand-sorted fresh</span></div></div></div>
        <div className="hero-art"><div className="art-circle"></div><img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1100&q=85" alt="Colorful fresh produce arranged in a basket" /><div className="floating-note"><span className="note-mark">✦</span><span>Picked with care<br /><b>for your table</b></span></div></div>
      </section>

      <section className="promise"><div className="shell promise-grid"><div><span className="promise-icon">✺</span><strong>Fresh, every time</strong><p>Hand-sorted before it leaves us.</p></div><div><span className="promise-icon">⌁</span><strong>Farmer connected</strong><p>Better demand, better harvests.</p></div><div><span className="promise-icon">↗</span><strong>Delivered to you</strong><p>Campus, home, office or shop.</p></div></div></section>

      <section className="shop shell" id="shop"><div className="section-heading"><div><p className="eyebrow">The weekly edit</p><h2>Bring home the good stuff.</h2></div><p className="section-intro">Simple boxes for busy Huye days. Choose what feels right, then finish your order over WhatsApp.</p></div><div className="filter-row"><div className="filters">{['All produce', 'Subscriptions', 'For businesses'].map((category) => <button className={activeCategory === category ? 'active' : ''} key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><span className="stock-note">{products.length} seasonal picks available</span></div><div className="product-grid">{displayedProducts.map((product) => <article className={`product-card ${product.tone}`} key={product.id}><div className="product-image"><img src={product.image} alt="" /><span className="product-size">{product.size}</span></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.description}</p></div><div className="product-buy"><strong>{formatPrice(product.price)}</strong><button onClick={() => addToCart(product)} aria-label={`Add ${product.name} to basket`}>Add <span>+</span></button></div></div></article>)}</div></section>

      <section className="how shell" id="how-it-works"><div className="how-visual"><img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=85" alt="Fresh vegetables ready for packing" /><span>From farm<br /><b>to doorstep.</b></span></div><div className="how-copy"><p className="eyebrow">The FVL way</p><h2>Freshness without the market run.</h2><div className="steps"><div><b>01</b><p><strong>Choose your box</strong><br />Browse today's hand-picked selection.</p></div><div><b>02</b><p><strong>Checkout on WhatsApp</strong><br />Your basket arrives in one simple message.</p></div><div><b>03</b><p><strong>We pack & deliver</strong><br />Same-day orders before 2 PM arrive in 2–4 hours.</p></div></div></div></section>

      <footer id="about"><div className="shell footer-inner"><img src="/fvl-logo.svg" alt="FruitVeggieLink" /><div><p>Green supplies at your fingertips.</p><a href="https://wa.me/250791234567" target="_blank" rel="noreferrer">WhatsApp us ↗</a></div><div className="footer-contact"><span>Huye, Southern Province</span><span>fruitveggielink@gmail.com</span><span>@fruitveggielink</span></div></div></footer>

      {cartOpen && <div className="cart-overlay" role="presentation" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="cart-header"><div><p className="eyebrow">Your selection</p><h2>Basket</h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close basket">×</button></div>{cart.length === 0 ? <div className="empty-cart"><img src="/fvl-icon.svg" alt="" /><p>{cartLabel}</p><button className="primary-button" onClick={() => setCartOpen(false)}>Keep browsing <span>↗</span></button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>{formatPrice(item.price)}</span><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)}>-</button><b>{item.quantity}</b><button onClick={() => updateQuantity(item.id, 1)}>+</button></div></div></div>)}</div><div className="cart-footer"><div><span>Estimated total</span><strong>{formatPrice(cartTotal)}</strong></div><button className="whatsapp-button" onClick={checkoutOnWhatsApp}>Checkout on WhatsApp <span>↗</span></button><small>You'll confirm payment and delivery details in WhatsApp.</small></div></>}</aside></div>}
    </main>
  )
}

export default App
