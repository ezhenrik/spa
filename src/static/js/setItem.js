export default function(key, value) {
    var event = new Event('itemInserted');

    event.value = value;
    event.key = key;
    if (value == null) {
        localStorage.removeItem(key)
    } else {
        localStorage.setItem(key, value);
    }
    
    document.dispatchEvent(event);
  
    
}