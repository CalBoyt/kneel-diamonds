import { getOrders } from "./database.js"
import { getMetals } from "./database.js"
import { getStyles } from "./database.js"
import { getSizes } from "./database.js"

const buildOrderListItem = (order) => {
    const metals = getMetals()
    const styles = getStyles()
    const sizes = getSizes()

    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId
        }    
    )
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )


    const totalCost = foundMetal.price + foundStyle.price + foundSize.price

const costString = totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
})

return `<li>
    Order #${order.id} cost ${costString}
</li>`

   
}

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}



// Remember that the function you pass to find() must return true/false


