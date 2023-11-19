$(document).ready(function () {
    loadItems();

    $('#addItemForm').submit(function (e) {
        e.preventDefault();
        const itemName = $('#itemName').val();

        addItem(itemName);
    });

    $('#itemList').on('click', 'button.delete', function () {
        const row = $(this).closest('tr');
        const itemId = row.data('id');

        deleteItem(itemId, row);
    });

    $('#itemList').on('click', 'button.update', function () {
        const itemId = $(this).closest('tr').data('id');
        updateItem(itemId);
    });

    function addItem(name) {
        $.ajax({
            type: 'POST',
            url: '/api/items',
            contentType: 'application/json',
            data: JSON.stringify({ name }),
            success: function () {
                loadItems();
                $('#itemName').val('');
            }
        });
    }

    function deleteItem(id, row) {
        $.ajax({
            type: 'DELETE',
            url: `/api/items/${id}`,
            success: function () {
                row.addClass('slide-out-right').on('animationend', function () {
                    row.remove();
                    loadItems(); 
                });
            }
        });
    }

    function updateItem(id) {
        const updatedName = prompt('Entre com o nome para atualizar:');
        if (updatedName) {
            $.ajax({
                type: 'PUT',
                url: `/api/items/${id}`,
                contentType: 'application/json',
                data: JSON.stringify({ name: updatedName }),
                success: function () {
                    loadItems();
                }
            });
        }
    }

    function loadItems() {
        $.get('/api/items', function (data) {
            const itemList = $('#itemList');
            itemList.empty();

            data.forEach(function (item) {
                const row = `<tr data-id="${item.id}">
                                <td>${item.id}</td>
                                <td>${item.name}</td>
                                <td>
                                    <button class="btn btn-danger delete">Delete <i class="fa-regular fa-trash-can fa-xs"></i></button> &#8287 &#8287
                                    <button class="btn btn-primary update">Update <i class="fa-solid fa-arrows-rotate fa-xs"></i></button>
                                </td>
                            </tr>`;
                itemList.append(row);
            });
        });
    }
});
