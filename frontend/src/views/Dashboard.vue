<template>
  <div class="dashboard-container">
    <div class="bar-chart">
      <chart
      :options="totalInvoice"
      />
    </div>
    <div class="line-chart">
      <chart
      :options="income"
      />
    </div>
  </div>
</template>

<script>
import invoiceService from '@/services/invoiceService'

export default {
  name: 'dashboard',
  data () {
    return {
      totalInvoice: {
        title: {
          text: 'Total Invoices',
          x: 'center',
          textStyle: {
            fontSize: 28
          }
        },
        color: ['#127ac2'],
        xAxis: {
          data: []
        },
        yAxis: {type: 'value'},
        series: [{
          name: 'Total Invoices',
          type: 'bar',
          data: []
        }]
      },
      income: {
        title: {
          text: 'YTD Income',
          x: 'center',
          textStyle: {
            fontSize: 28
          }
        },
        color: ['#127ac2'],
        xAxis: {
          data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {type: 'value'},
        series: [{
          name: 'YTD Income',
          type: 'line',
          data: [10, 20, 30, 40]
        }]
      }
    }
  },
  async created () {
    try {
      await invoiceService.index().then(res => {
        let invoices = res.data.invoices
        let dates = invoices.map(invoice => new Date(invoice.createdAt).toLocaleString('en-us', { month: 'short' })
          ).sort((a, b) => a > b)
        let numOfInvoices = invoices.length
        console.log(numOfInvoices)
        this.totalInvoice.xAxis.data = [...new Set(dates)]
        //this.totalInvoice.series.data = numOfInvoices
      })
    } catch (err) {
      alert(err)
    }
  }
}
</script>

<style scoped>

.dashboard-container {
  padding-top: 65px;
}

.bar-chart, .line-chart {
  width: 100%;
  height: 500px;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>
