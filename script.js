let dlist=document.querySelector('#searchboxfield');
let inpfield=document.querySelector('#inpbox');
//localStorage.setItem('favourites',JSON.stringify({}));
let favmeals=JSON.parse(localStorage.getItem('favourites'));

function inpchange(ele)
{
    let inp=ele.value;
    
    if(inp.length>0)
    {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f='+inp[0])
    .then((response)=>{
        if(!response.ok)
        {
            throw new Error('some error occured');
        }
        return response.json();
    })
    .then((res)=>{
        let items=res.meals;
        let dliststr='';
        for(let i=0;i<items.length;i++)
        {   
            let itname=items[i]['strMeal'].toLowerCase();
            if(inp==itname.substr(0,inp.length))
            {
                dliststr+=`<option value="${itname}">${itname}</option>`;
            }
        }
        dlist.innerHTML=dliststr;
    })
    .catch((err)=>{
        console.log(err);
    });
    }
} 
function searchitem()
{
    let inp=inpfield.value;
    console.log('in search items function');
    if(inp.length>0)
    {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+inp)
    .then((response)=>{
        if(!response.ok)
        {
            throw new Error('some error occured');
        }
        return response.json();
    })
    .then((res)=>{
        let items=res.meals;
        console.log(items);
        if(items==null)
        {
            alert('No Results found with the search criteria');
        }
        if(items.length==1)
        {
            //let t=document.querySelector('#testing');
            //t.innerHTML='hello';
            window.location.href='./detail.html?id='+items[0]['idMeal'];
        }
        else{
            window.location.href='./searchresults.html?name='+inp;
        for(let i=0;i<items.length;i++)
        {   itname
            let itname=items[i]['strMeal'].toLowerCase();
            if(inp==itname.substr(0,inp.length))
            {
                dliststr+=`<option value="${itname}">${itname}</option>`;
            }
        }
        dlist.innerHTML=dliststr;
        }   
    })
    .catch((err)=>{
        console.log(err);
    });
    }
}
function updatedetailpage(id)
{   
    console.log('in upload detailpage');
    let displayimage=document.querySelector('.displayimage');
    let itemname=document.querySelector('#itemname');
    let itemctg=document.querySelector('#itemctg');
    let aorg=document.querySelector('#aorg');
    let ylink=document.querySelector('#ylink');
    let instructions=document.querySelector('#instructions');
    let ingredients=document.querySelector('.ingredients');
    console.log(id);
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
    .then((response)=>{
        if(!response.ok)
        {
            throw new Error('some error occured');
        }
        return response.json();
    })
    .then((res)=>{
        console.log(res);
        res=res['meals'][0];
        displayimage.setAttribute('src',res['strMealThumb']);
        itemname.innerHTML=res['strMeal'];
        itemctg.innerHTML=res['strCategory'];
        aorg.innerHTML=res['strArea'];
        ylink.setAttribute('href',res['strYoutube']);
        instructions.innerHTML=res['strInstructions'];
        let ingdetails='';
        for(let i=1;i<=20;i++)
        {
            if(res[`strIngredient${i}`]!='' && res[`strIngredient${i}`]!=null)
            {
                ingdetails+=`<span style="display:inline-block;width:150px">${res['strIngredient'+i]}</span> : ${res['strMeasure'+i]}<br>`;
            }
        }
        ingredients.innerHTML=ingdetails;
    })
    .catch((err)=>{
        console.log(err);
    });
    
}
function favmealsfun(id)
{
    console.log(id);
    let mealtypeelement=document.querySelector('#mealtype'+id);
    console.log(favmeals);
    if(favmeals && favmeals[id])
    {
        delete favmeals[id];
        mealtypeelement.setAttribute('src','./assets/nofav.png');
    }
    else{
        favmeals[id]=true;
        mealtypeelement.setAttribute('src','./assets/fav.png');
    }
    console.log(favmeals);
    localStorage.setItem('favourites',JSON.stringify(favmeals));
}