<template>
  <NavHead/>
  <div class="dashboard-container">
    <div class="bar-chart">
      <h2>Monthly Invoices</h2>
      <chart
      :options="totalInvoice"
      />
    </div>
    <div class="line-chart">
      <chart
      :options="income"
      :loading="loading"
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
      loading: true,
      totalInvoice: {
        color: ['#127ac2', '#047513', '#b50915'],
        legend: {
          data: ['Total Invoices', 'Total Invoices Paid', 'Total Invoices Late']
        },
        xAxis: {
          data: []
        },
        yAxis: {type: 'value'},
        series: [
        {
          name: 'Total Invoices',
          type: 'bar',
          barGap: 0,
          data: []
        },
        {
          name: 'Total Invoices Paid',
          type: 'bar',
          data: []
        },
        {
          name: 'Total Invoices Late',
          type: 'bar',
          data: []
        }
      ]
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
        // find all invoices by month
        let numAndDate = invoices.map(invoice => new Date(invoice.createdAt).toLocaleString('en-us', { month: 'short' }))
        .sort((a, b) => a < b)
        .reduce((obj, data) => {
          if (!obj[data]) { obj[data] = 0 }
          obj[data]++
          return obj
          }, {})
          // sort paid invoices
        let invoicePayments = invoices.map(invoice => ({paid: invoice.amount_paid, due: invoice.total_due, date: new Date(invoice.createdAt).toLocaleString('en-us', { month: 'short' })}))
        .sort((a, b) => a.date < b.date)
        let total_paid = invoicePayments.reduce((obj, data) => {
          if(!obj[data.date]) { obj[data.date] = 0}
          if (data.due - data.paid === 0) {
            obj[data.date]++
          }
          return obj
        }, {})

        this.totalInvoice.xAxis.data = [...Object.keys(numAndDate)]
        this.totalInvoice.series[0].data = [...Object.values(numAndDate)]
        this.totalInvoice.series[1].data = [...Object.values(total_paid)]
        this.loading = false
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

.line-chart {
  margin-top: 50px;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>
