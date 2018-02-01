<template>
  <section class="clients" id="clients">
    <h2 class="clients-heading">
      Clients I've Worked With
    </h2>
    <ul class="clients-list">
      <li class="clients-item" v-for="(client, index) in clients" v-bind:key="index">
        <a :href="client.link" class="clients-link">
          <img :src="'clients/' + client.imageURL" :alt="client.name" class="clients-image" :title="client.name">
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      clients: [
        {
          name: 'David\'s Tea',
          imageURL: 'davids-tea.svg',
          link: 'https://www.davidstea.com/'
        },
        {
          name: 'Parler SST',
          imageURL: 'parler-sst.svg',
          link: 'https://parlersst.com/'
        },
        {
          name: 'DuProprio',
          imageURL: 'duproprio.svg',
          link: 'https://duproprio.com/en'
        },
        {
          name: 'Laura Canada',
          imageURL: 'laura-canada.svg',
          link: 'https://www.laura.ca/'
        },
        {
          name: 'YuCentrik',
          imageURL: 'yucentrik.svg',
          link: 'https://yucentrik.ca/en/'
        },
        {
          name: '2associes',
          imageURL: '2associes.svg',
          link: 'https://2associes.com/'
        }
      ]
    }
  }
}
</script>