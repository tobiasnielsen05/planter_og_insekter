<template>
<div class="article plant-care-section-wrapper" style="flex-direction: column;">
    
    <header>
        <h2>Botanisk Oversigt</h2>
        <p>En oversigt over udvalgte planters livscyklus, farve, blomstring og lysbehov.</p>
    </header>

    <table class="plant-table">
        <thead class="cM">
            <tr>
                <th>Navn</th>
                <th>Livsvarighed</th>
                <th>Farve</th>
                <th>Blomstring</th>
                <th>Lys</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td data-label="Navn">Solsikke</td>
                <td data-label="Livsvarighed">Étårig</td>
                <td data-label="Farve">
                    <span class="color-circle" style="background-color: #FBBF24;" title="Gul"></span>
                </td>
                <td data-label="Blomstring">Jun - Sep</td>
                <td data-label="Lys">Fuld Sol</td>
            </tr>
            <tr>
                <td data-label="Navn">Lavendel</td>
                <td data-label="Livsvarighed">Flerårig</td>
                <td data-label="Farve">
                    <span class="color-circle" style="background-color: #A78BFA;" title="Violet"></span>
                </td>
                <td data-label="Blomstring">Jul - Aug</td>
                <td data-label="Lys">Meget Sol</td>
            </tr>
            <tr>
                <td data-label="Navn">Bregne</td>
                <td data-label="Livsvarighed">Flerårig</td>
                <td data-label="Farve">
                    <span class="color-circle" style="background-color: #10B981;" title="Grøn"></span>
                </td>
                <td data-label="Blomstring">Ingen</td>
                <td data-label="Lys">Fuld Skygge</td>
            </tr>
            <tr>
                <td data-label="Navn">Tulipan</td>
                <td data-label="Livsvarighed">Flerårig</td>
                <td data-label="Farve">
                    <span class="color-circle" style="background-color: #F87171;" title="Rød"></span>
                </td>
                <td data-label="Blomstring">Apr - Maj</td>
                <td data-label="Lys">Halvskygge</td>
            </tr>
            <tr>
                <td data-label="Navn">Mynte</td>
                <td data-label="Livsvarighed">Flerårig</td>
                <td data-label="Farve">
                    <span class="color-circle" style="background-color: #E5E7EB;" title="Grå/Hvid"></span>
                </td>
                <td data-label="Blomstring">Jun - Sep</td>
                <td data-label="Lys">Sol/Skygge</td>
            </tr>
        </tbody>
    </table>
</div>
</template>


<script>
export default {
    name: 'PlantCareSection',
}
</script>