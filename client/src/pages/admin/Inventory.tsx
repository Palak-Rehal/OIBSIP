import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Package,
  AlertTriangle,
  Edit3,
  X,
} from "lucide-react";

import {
  getInventory,
  updateInventory,
} from "../../api/inventoryApi";


interface InventoryItem {

  _id:string;

  name:string;

  category:string;

  stock:number;

  threshold:number;

}



const Inventory =()=>{


const [items,setItems]=useState<InventoryItem[]>([]);

const [loading,setLoading]=useState(true);

const [search,setSearch]=useState("");

const [selected,setSelected]=
useState<InventoryItem|null>(null);


const [stock,setStock]=useState(0);

const [threshold,setThreshold]=useState(5);





const fetchInventory=async()=>{

try{

const res=await getInventory();

setItems(res.data.inventory || []);

}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}

};



useEffect(()=>{

fetchInventory();

},[]);





const filteredItems=useMemo(()=>{

return items.filter(item=>

item.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);

},[items,search]);





const saveUpdate=async()=>{


if(!selected) return;


try{


await updateInventory(

selected._id,

{
stock,
threshold
}

);


setSelected(null);

fetchInventory();


}

catch(error){

console.log(error);

}


};






return (

<div className="
min-h-screen
bg-gradient-to-br
from-[#F8F6F3]
to-[#EEE6DD]
p-6
lg:p-10
">


<div className="max-w-7xl mx-auto">



{/* Header */}


<div className="flex justify-between items-center mb-10">


<div>

<h1 className="
text-4xl
font-black
text-[#2E2B27]
">

Inventory Management

</h1>


<p className="text-gray-500 mt-2">

Track pizza stock and availability

</p>


</div>


</div>






{/* Stats */}


<div className="grid sm:grid-cols-3 gap-6 mb-10">



<div className="
bg-white/60
backdrop-blur-xl
border
border-white
rounded-3xl
p-6
shadow-xl
">

<p className="text-gray-500">
Total Items
</p>


<h2 className="
text-4xl
font-black
mt-2
">

{items.length}

</h2>


</div>




<div className="
bg-white/60
backdrop-blur-xl
rounded-3xl
p-6
shadow-xl
border
border-white
">


<p className="text-gray-500">
Low Stock
</p>


<h2 className="
text-4xl
font-black
text-red-500
mt-2
">

{
items.filter(
i=>i.stock<=i.threshold
).length
}

</h2>


</div>





<div className="
bg-white/60
backdrop-blur-xl
rounded-3xl
p-6
shadow-xl
border
border-white
">


<p className="text-gray-500">
Available
</p>


<h2 className="
text-4xl
font-black
text-green-600
mt-2
">

{
items.filter(
i=>i.stock>i.threshold
).length
}

</h2>


</div>



</div>







{/* Main Glass Container */}


<div className="
bg-white/50
backdrop-blur-2xl
rounded-3xl
border
border-white
shadow-2xl
overflow-hidden
">





<div className="
flex
items-center
justify-between
p-6
border-b
border-white
">


<div className="flex gap-3 items-center">


<Package
className="text-[#BD6A3C]"
/>


<h2 className="
text-2xl
font-black
">

Stock Overview

</h2>


</div>




<div className="relative">


<Search
className="
absolute
left-4
top-3
text-gray-400
"
size={18}
/>


<input

placeholder="Search item..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

className="
bg-white/70
backdrop-blur
rounded-2xl
pl-11
pr-5
py-3
outline-none
focus:ring-2
focus:ring-[#BD6A3C]
"

/>


</div>



</div>








<table className="w-full">


<thead>

<tr className="
bg-white/40
text-gray-500
uppercase
text-sm
">

<th className="p-5 text-left">
Item
</th>

<th className="p-5 text-left">
Category
</th>

<th className="p-5 text-left">
Stock
</th>

<th className="p-5">
Action
</th>


</tr>


</thead>



<tbody>


{
loading?

<tr>

<td
colSpan={4}
className="text-center py-20"
>

Loading...

</td>

</tr>


:


filteredItems.map(item=>(


<tr
key={item._id}
className="
border-t
border-white
hover:bg-white/50
transition
">


<td className="p-5 font-bold">

{item.name}

</td>



<td className="p-5">

{item.category}

</td>



<td className="p-5">


{
item.stock<=item.threshold?

<span className="
flex
items-center
gap-2
text-red-600
font-bold
">

<AlertTriangle size={16}/>

Low Stock ({item.stock})

</span>


:

<span className="
text-green-600
font-bold
">

{item.stock} Available

</span>

}



</td>



<td className="p-5 text-center">


<button

onClick={()=>{

setSelected(item);

setStock(item.stock);

setThreshold(item.threshold);

}}

className="
bg-[#BD6A3C]
text-white
p-3
rounded-xl
hover:scale-105
transition
"

>

<Edit3 size={18}/>

</button>


</td>


</tr>


))

}



</tbody>


</table>



</div>








{/* Update Modal */}



{
selected &&


<div className="
fixed
inset-0
bg-black/40
backdrop-blur-sm
flex
items-center
justify-center
z-50
">


<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
p-8
w-full
max-w-md
shadow-2xl
">


<button

onClick={()=>setSelected(null)}

className="
absolute
"

>

<X/>

</button>


<h2 className="
text-2xl
font-black
mb-6
">

Update Stock

</h2>



<input

type="number"

value={stock}

onChange={
e=>setStock(
Number(e.target.value)
)
}

className="
w-full
border
rounded-xl
p-3
mb-4
"

/>



<input

type="number"

value={threshold}

onChange={
e=>setThreshold(
Number(e.target.value)
)
}

className="
w-full
border
rounded-xl
p-3
"

/>



<button

onClick={saveUpdate}

className="
mt-5
w-full
bg-[#BD6A3C]
text-white
py-3
rounded-xl
font-bold
"

>

Save Changes

</button>



</div>


</div>

}



</div>


</div>

);


};


export default Inventory;