import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';  // Certifique-se de que o caminho está correto


// colocando pedidos usando metodo COD 
const placeOrder = async (req, res) => {

    //aqui vc está pegando os dados do userModel 
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        //limpar dados do carrinho ao clicar em ir para a pagina de pagamento/pagar
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        //mensagem de sucesso de pedido
        res.json({ success: true, message: "Pedido feito" })

    } catch (error) {
        //mensagem de erro ao gerar pedido
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

//colocando pedidos usando metodo stripe
const placeOrderStripe = async (req, res) => {


}
// colocando pedidos usando metodo Rzorpay
const placeOrderRazorpay = async (req, res) => {

}

// Todos os dados do pedido de painel do administrador
const allOrders = async (req, res) => {

    try {
        const order = await orderModel.find({})
        res.json({ success: true, order })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

//Dados do pedido do usuario do fronteEnd

const userOrders = async (req, res) => {

    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })

        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

// atualizar pedido do painel do administrador
const updateStatus = async (req, res) => {

}


export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }