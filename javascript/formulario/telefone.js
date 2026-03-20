const select_box = document.querySelector('.options');
const search_box = document.querySelector('input[name="search-box"]');
const input_box = document.querySelector('input[type="tel"]');
const selected_option = document.querySelector('.selected-option > div');

let options = null;

for(country of countries){
    const option = `<li class="option">
                        <div>
                            <span class="iconify" data-icon="flag:${country.code.toLowerCase()}-4x3"></span>
                            <span class="country-name">${country.name}</span>
                        </div>
                        <strong>+${country.phone}</strong>
                    </li>`;

    select_box.querySelector('ol').insertAdjacentHTML('beforeend', option)
    options = document.querySelectorAll('.option')
}

selected_option.addEventListener('click', () =>{
    select_box.classList.toggle('active');
    selected_option.classList.toggle('active')
})

function selectOption(){
    console.log(this);
    const icon = this.querySelector('.iconify').cloneNode(true);
    phone_code = this.querySelector('strong').cloneNode(true);

    selected_option.textContent = '';
    selected_option.append(icon,phone_code);

    input_box.value = phone_code.textContent;
}

function searchCountry(){
    let searchEl = search_box.value.toLowerCase();
    for(option of options){
        let is_matched = option.querySelector('.country-name').textContent.toLowerCase().includes(searchEl);
        option.classList.toggle('hide', !is_matched);
    }
}

options.forEach(option=> option.addEventListener('click', selectOption))

search_box.addEventListener('input', searchCountry);