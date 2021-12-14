using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Windows.Threading;

namespace FootTourCA
{
    /// <summary>
    /// Interaction logic for Dashboard.xaml
    /// </summary>
    public partial class Dashboard : Window
    {
        int collapsing = 0;
        DispatcherTimer dt = new DispatcherTimer();
        public Dashboard()
        {
            InitializeComponent();
            ResizeMode = ResizeMode.CanMinimize;
        }

        private void BtnCollapse_Click(object sender, RoutedEventArgs e)
        {
            dt.Interval = TimeSpan.FromMilliseconds(10);
            dt.Tick += Collapse;
            dt.Start();
            collapsing = 0;
        }

        private void Collapse(object sender, EventArgs e)
        {
            GridInner.Margin = new Thickness(GridInner.Margin.Left - collapsing * 4, GridInner.Margin.Top, GridInner.Margin.Right, GridInner.Margin.Bottom);
            BtnCollapse.Margin = new Thickness(BtnCollapse.Margin.Left - collapsing * 4, BtnCollapse.Margin.Top, BtnCollapse.Margin.Right, BtnCollapse.Margin.Bottom);
            ++collapsing;
            if (collapsing == 40)
                dt.Stop();
        }
    }
}
