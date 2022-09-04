//tangkap beberapa element HTML
let modal = document.getElementById("modal");
let floating_button = document.getElementById("floating_button");
let modal_bg = document.getElementById("modal_bg");
let addlist_form = document.getElementById("addlist_form");
let root = document.getElementById("root");
let subtitle = document.getElementById('subtitle');

//tambahkan date ke subtitle
subtitle.innerHTML = new Date().toLocaleDateString();

//data list belanja
let data_list_belanja = [];

//membuat event listener
floating_button.addEventListener("click", ()=>{
    
    //memunculkan modal
    if(modal.style.display == "none"){
        showModal();
        return
    }

    //sembunyikan modal kembali
    hideModal();
})

//tambahkan event listener ke modal bg
modal_bg.addEventListener("click", ()=>{
    
    //sembunyikan modal kembali
    hideModal();
})

//tambahkan event listener submit ke addlist form
addlist_form.addEventListener("submit", (event)=>{
    
    //stop form dari reload page 
    event.preventDefault();

    //tangkap value dari masing - masing input field
    let barang = event.target.barang.value;
    let harga = event.target.harga.value;
    
     //memastikan value terisi dengan benar
    if (!barang){
    alert ("Mohon isi nama barang !")
    return
    }else if (!harga){
    alert ("Mohon isi harga barang !")
    return
    }


    //push data ke array data list belanja
    data_list_belanja.push({
        nama_barang : barang,
        harga_barang : harga,
        date : new Date().toLocaleDateString()
    })

    console.info(data_list_belanja);
    //clear input field
    event.target.barang.value = "";
    event.target.harga.value = "";
    
    hideModal();
    renderToHtml();
})

// function show modal
function showModal(){
    modal.style.display = "flex";
    floating_button.style.backgroundColor = "gray";
    floating_button.style.transform = "rotate(45deg)";
}

// function hide modal
function hideModal(){
    modal.style.display = "none";
    floating_button.style.backgroundColor = "teal";
    floating_button.style.transform = "rotate(0deg)";
}

//function untuk render ke html
function renderToHtml(){
    
    // clear element div
    root.innerHTML = "";

    //perulangan
    data_list_belanja.forEach((e,i)=>{
        root.innerHTML += `
        <div class="card">
            <small>${e.date}</small>
            <div>
                ${e.nama_barang} <span> Rp. ${e.harga_barang} </span>
            </div>
            <button onclick="handleDelete(${i})">Selesai</button>
        </div>
        `
    })
}

//function delete item pada array data list belanja
function handleDelete(index){

    //confirm delete
    let confirm_delete = confirm("Yakin sudah selesai ?, Mau dihapus?")

    if(!confirm_delete){
        return
    }

    data_list_belanja.splice(index, 1);

    renderToHtml();
}
