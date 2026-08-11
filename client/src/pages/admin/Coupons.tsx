import { useEffect, useMemo, useState } from "react";
import {
  Search,
  TicketPercent,
  Plus,
  Trash2,
} from "lucide-react";

import {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
} from "../../api/adminApi";


interface Coupon {

  _id: string;

  code: string;

  discountType: string;

  discountValue: number;

  minOrderAmount: number;

  expiryDate: string;

  isActive: boolean;

}



const Coupons = () => {


  const [coupons,setCoupons] =
    useState<Coupon[]>([]);

  const [loading,setLoading] =
    useState(true);

  const [search,setSearch] =
    useState("");

  const [showModal,setShowModal] =
    useState(false);


  const [form,setForm] = useState({

    code:"",

    discountType:"Percentage",

    discountValue:0,

    minOrderAmount:0,

    expiryDate:""

  });





  const fetchCoupons = async()=>{

    try{

      const res = await getAllCoupons();

      setCoupons(
        res.data.coupons || []
      );

    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  };




  useEffect(()=>{

    fetchCoupons();

  },[]);





  const filteredCoupons =
    useMemo(()=>{

      return coupons.filter(
        coupon=>

        coupon.code
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      );

    },[coupons,search]);






  const handleCreate = async()=>{


    try{


      await createCoupon(form);


      setShowModal(false);


      setForm({

        code:"",
        discountType:"Percentage",
        discountValue:0,
        minOrderAmount:0,
        expiryDate:""

      });


      fetchCoupons();


    }
    catch(error){

      console.log(error);

    }


  };





  const handleDelete = async(id:string)=>{


    try{

      await deleteCoupon(id);

      fetchCoupons();

    }
    catch(error){

      console.log(error);

    }


  };






return (

<div className="min-h-screen bg-[#F8F6F3] p-6 lg:p-10">


<div className="max-w-7xl mx-auto">



{/* Header */}


<div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">


<div>

<h1 className="text-4xl font-black text-[#2E2B27]">
Coupons Management
</h1>


<p className="text-gray-500 mt-2">
Create and manage discount offers.
</p>


</div>




<button

onClick={()=>setShowModal(true)}

className="
flex items-center gap-2
bg-[#BD6A3C]
text-white
px-5 py-3
rounded-2xl
hover:bg-[#a85b33]
transition
"

>

<Plus size={18}/>

Add Coupon

</button>



</div>





{/* Stats */}


<div className="grid sm:grid-cols-3 gap-6 mb-8">


<div className="bg-white rounded-3xl p-6 border">

<p className="text-gray-500">
Total Coupons
</p>


<h2 className="text-4xl font-black mt-2">
{coupons.length}
</h2>

</div>



<div className="bg-white rounded-3xl p-6 border">

<p className="text-gray-500">
Active
</p>


<h2 className="text-4xl font-black text-green-600 mt-2">

{
coupons.filter(
c=>c.isActive
).length
}

</h2>

</div>




<div className="bg-white rounded-3xl p-6 border">

<p className="text-gray-500">
Expired
</p>


<h2 className="text-4xl font-black text-red-500 mt-2">

{
coupons.filter(
c=>
new Date(c.expiryDate)
<
new Date()
).length
}

</h2>

</div>


</div>







{/* Table */}



<div className="
bg-white
rounded-3xl
border
overflow-hidden
">



<div className="flex items-center gap-3 px-6 py-5 border-b">

<TicketPercent
className="text-[#BD6A3C]"
/>

<h2 className="text-2xl font-black">
Coupon List
</h2>

</div>





<div className="p-6">


<div className="relative mb-6">

<Search
className="absolute left-4 top-3 text-gray-400"
size={18}
/>


<input

placeholder="Search coupon..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

className="
w-full
border
rounded-2xl
py-3
pl-11
outline-none
focus:ring-2
focus:ring-[#BD6A3C]
"

/>

</div>





{loading ? (

<p className="text-center py-10">
Loading Coupons...
</p>

)

:

filteredCoupons.length===0 ? (

<p className="text-center py-10 text-gray-500">
No Coupons Found
</p>

)

:

<table className="w-full">


<thead className="bg-[#FAF7F2]">

<tr>

<th className="px-5 py-4 text-left">
Code
</th>

<th className="px-5 py-4 text-left">
Discount
</th>

<th className="px-5 py-4 text-left">
Minimum
</th>

<th className="px-5 py-4 text-left">
Expiry
</th>

<th className="px-5 py-4">
Action
</th>

</tr>

</thead>



<tbody>


{
filteredCoupons.map(
coupon=>(


<tr
key={coupon._id}
className="
border-b
hover:bg-[#FAF7F2]
"
>


<td className="px-5 py-4 font-bold">

{coupon.code}

</td>


<td className="px-5 py-4">

{coupon.discountValue}
{coupon.discountType==="Percentage"
?"%"
:"₹"
}

</td>



<td className="px-5 py-4">

₹{coupon.minOrderAmount}

</td>



<td className="px-5 py-4">

{
new Date(
coupon.expiryDate
).toLocaleDateString()
}

</td>



<td className="px-5 py-4 text-center">


<button

onClick={()=>
handleDelete(coupon._id)
}

className="
bg-red-100
text-red-600
p-3
rounded-xl
"

>

<Trash2 size={18}/>

</button>


</td>



</tr>


)
)

}


</tbody>



</table>


}



</div>



</div>







{/* Create Modal */}



{
showModal && (

<div className="
fixed inset-0
bg-black/40
flex items-center justify-center
z-50
">


<div className="
bg-white
rounded-3xl
p-8
w-full
max-w-md
">


<h2 className="text-2xl font-black mb-5">
Create Coupon
</h2>



<input
placeholder="Coupon Code"

className="input"

onChange={
e=>setForm({
...form,
code:e.target.value
})
}

/>


<input
placeholder="Discount Value"

type="number"

className="input mt-3"

onChange={
e=>setForm({
...form,
discountValue:Number(e.target.value)
})
}

/>



<input

type="date"

className="input mt-3"

onChange={
e=>setForm({
...form,
expiryDate:e.target.value
})
}

/>




<button

onClick={handleCreate}

className="
mt-5
w-full
bg-[#BD6A3C]
text-white
py-3
rounded-xl
"

>

Create

</button>


</div>


</div>

)

}




</div>


</div>

);


};


export default Coupons;